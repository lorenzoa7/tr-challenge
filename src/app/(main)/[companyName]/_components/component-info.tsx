'use client'

import { Separator } from '@/components/separator'
import { useComponentStore } from '@/store/use-component-store'
import { ArrowLeftIcon, InboxIcon, RadioIcon, RouterIcon } from 'lucide-react'

export function ComponentInfo() {
  const { selectedComponent } = useComponentStore()

  return (
    <section className="w-full flex-1 border-2 border-slate-200 p-5">
      {!selectedComponent && (
        <div className="flex h-full items-center justify-center">
          <ArrowLeftIcon className="mr-2" />
          <p className="text-lg font-bold">
            Selecione um ativo para visualizar suas informações.
          </p>
        </div>
      )}

      {selectedComponent && (
        <div className="flex h-full flex-col gap-7">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">{selectedComponent.name}</h1>
            <span
              data-alert={selectedComponent.status === 'alert'}
              className="data-[alert=false]:text-green-500 data-[alert=true]:text-red-500"
            >
              {selectedComponent.sensorType === 'energy' ? '⚡' : '●'}
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-7">
              <button className="flex h-56 w-80 flex-col items-center justify-center rounded border border-dashed border-blue-500 bg-blue-100 text-blue-500">
                <InboxIcon className="size-11" />
                <p>Adicionar imagem do ativo</p>
              </button>

              <div className="flex flex-1 flex-col gap-1">
                <h2 className="font-semibold">Tipo de equipamento</h2>
                <span className="text-slate-500">
                  Motor Elétrico (Trifásico)
                </span>
                <Separator
                  orientation="horizontal"
                  className="my-4 bg-slate-300"
                />

                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold">Responsáveis</h2>
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-blue-500 text-center uppercase text-slate-50">
                      {selectedComponent.sensorType === 'energy' ? 'E' : 'M'}
                    </div>
                    <span className="text-slate-500">
                      {selectedComponent.sensorType === 'energy'
                        ? 'Elétrica'
                        : 'Mecânica'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator orientation="horizontal" className="my-6 bg-slate-300" />

            <div className="flex w-full items-center">
              {selectedComponent.sensorId && (
                <div className="flex flex-1 flex-col gap-2">
                  <h2 className="font-semibold">Sensor</h2>
                  <div className="flex items-center gap-2">
                    <RadioIcon className="size-5 text-blue-500" />
                    <span className="text-slate-500">
                      {selectedComponent.sensorId}
                    </span>
                  </div>
                </div>
              )}

              {selectedComponent.gatewayId && (
                <div className="flex flex-1 flex-col gap-2">
                  <h2 className="font-semibold">Receptor</h2>
                  <div className="flex items-center gap-2">
                    <RouterIcon className="size-5 text-blue-500" />
                    <span className="text-slate-500">
                      {selectedComponent.gatewayId}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
