# ⚙️ Tree View Challenge </h1>

<div style="display: inline_block">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/next-js%2338B2AC.svg?style=for-the-badge&logo=next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
  
</div>

![Tr Challenge Demo](public/github/demo_tr_challenge.mp4)


## 📑 About
<p>An application that reads data from an API, transforms it into a binary tree structure, and displays it on the screen in a tree visualization format.

Users can click on locations and assets to expand their content and can click on components to view more information. Additionally, users can use filters to search for a specific node.
</p>


<a href="https://tr-challenge.vercel.app" target="_blank">Navigate to the app</a>

## 📃 Development process

### 1. About the Challenge
First of all, it was a tremendous pleasure to undertake this challenge, which was one of the best I've ever done! It not only tests the developer's ability to think of good UI solutions but also challenges their ability to solve complex problems, such as binary tree search.

### 2. Interface
At the beginning of the app development, I focused on the interface part, making only a few modifications from the original material, only those I thought made sense. For example, instead of a traditional menu in the header, I opted to turn it into a select, as it seems new companies can be registered in the system and, at some point, the number of new pages might not fit horizontally in a header.

For the tree interface, it was quite simple, since the structure had been previously set up. I used framer-motion to add some animations, making it more pleasant and less like old software.

### 3. The Tree
Now for the most interesting part of the challenge, which was indeed building the tree. It was clear to me that, being two different endpoints that necessarily delivered content that needed to be related, both should be requested in parallel and their results incorporated into a function to build an object tree.

Initially, I used Tanstack Query (React Query) with its useQueries hook and combine() method to make the requests and combine them into a single object. This object was then passed to a function that iterated over the data and associated each item.

For the filter, it seemed easy too: after passing the form validations, updating a state that was passed in the queryKey, and redoing the request, but filtering the nodes afterward.

However, obviously, this implementation is not good, since the trees can be very large (as in the case of Apex). Therefore, the user would have an overload of this service in the browser. Therefore, this load was moved to the server, where I created a route handler to process the creation and filtering of the tree, and this processing load stayed on the server.

It worked very well, but the search algorithm was still bad and taking too long. I then decided to implement the filtering using Depth-First Search (which has a time complexity of O(V + E)) and use a Map() structure in the creation of the tree.

With this, I managed to reduce the processing time by more than 75%. However, it was still possible to optimize even more. First, I decided to remove react query and generate this tree in SSR, encapsulating the tree component in a Suspense. This meant that I no longer needed to make an HTTP request to my own server but simply invoke the function directly on the server-side of the component.

Then, to have the request updated with the filter, I used URL state, with search params. With this, Next.js cached the content of the pages, as each filter combination resulted in a different page. In addition, I forced the caching of all three requests, removing the possibility of revalidation, since the data from this API will most likely not change while the user has the application open. Of course, if necessary, I have already left the revalidation interval in a configuration file to be able to change it quickly in the future if needed.

With all these techniques, I managed to achieve a result that I consider very pleasant and with great usability, with everything being rendered by the server and being properly cached to avoid unnecessary new requests.

## 📈 Improvements

Unfortunately, due to the short time frame, some things were left out, but I would also like to implement them. First, in the interface, I would like to make the application responsive, with a sidebar or drawer for the tree, and also implement PWA. However, in my portfolio I already have some projects with examples of these types of implementations.

Another interface improvement I would have liked to make was to transform the company select into comboboxes, allowing for company search by name (thinking about scalability).

For the tree, I would like to explore more strategies to achieve the best possible performance in creation and filtering operations. I even tried other types of approaches, such as a bottom-up search, saving the filtering status of each node to remove parent nodes from the search queue. However, this approach could increase memory usage to store the path of visited nodes and the performance result was not satisfactory. But I am sure that, with more time invested, an even better strategy could be developed!

Lastly, another point that I ended up opting not to do, but would be totally feasible, was to remove the global state manager (zustand) to store component information and display it in the right window and, instead, use URL state with the component ID as a slug to identify the component to be displayed on the screen. However, since the component ID is a UUID, I thought this approach made the URL too cluttered, so I decided not to implement it. However, I believe that if there were another type of unique identifier on the object, it would be an even better and totally server-side approach.

## 🎮 Running Locally

### 1. Clone this repository:
<pre>
  <code>
    git clone https://github.com/lorenzoa7/tr-challenge.git
  </code>
</pre>

<h3>2. Install the dependencies:</h3>
<pre>
  <code>
    pnpm install
  </code>
</pre>

<h3>3. Start the server</h3>
<pre>
  <code>
    pnpm dev
  </code>
</pre>

## 🔧 Credits
<a href="https://github.com/lorenzoa7" style='display: flex; flex-direction: column; align-items: center;'>
    <img style='border-radius: 50%; object-fit: cover;' src="https://i.imgur.com/LYIXPIH.jpg" width="100px;" height="100px;" alt="Foto do Lorenzo Aceti"/><br>
    <sub>
        <b>Lorenzo Aceti</b>
    </sub>
</a>
