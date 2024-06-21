import { getAssets } from '@/api/get-assets'
import { getLocations } from '@/api/get-locations'
import { buildTree } from '@/functions/build-tree'
import { filterSchema } from '@/schemas/filter-schema'

type Params = { params: { slug: string } }

export async function GET(request: Request, { params }: Params) {
  const { searchParams } = new URL(request.url)
  const searchTerm = searchParams.get('search') || ''
  const scope = searchParams.get('scope') || 'none'

  const filterResult = filterSchema.safeParse({ searchTerm, scope })
  if (!filterResult.success) {
    return new Response(
      JSON.stringify({
        message: 'Parâmetros de URL inválidos. Tente novamente!',
      }),
      { status: 422 },
    )
  }

  const { data: filter } = filterResult

  try {
    const [locations, assets] = await Promise.all([
      getLocations({ companyId: params.slug }),
      getAssets({ companyId: params.slug }),
    ])

    const data = buildTree({
      locations,
      assets,
      filter,
    })

    return new Response(JSON.stringify({ data, message: '' }), {
      status: 200,
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        data: [] as Node[],
        message:
          'Não foi possível carregar os dados. Tente recarregar a página!',
      }),
      { status: 500 },
    )
  }
}
