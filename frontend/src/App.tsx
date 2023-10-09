import React from 'react';
import Search from './components/Search';

function App() {
  return (
    <main className="flex flex-col h-screen">
      <header className='h-16 bg-gray-400 flex justify-center items-center text-black'>
        <h1 className='text-xl font-bold'>Recherche de membres sur Github</h1>
      </header>
      <section className="container mx-auto p-4">
        <Search />
      </section>
    </main>
  );
}

export default App;
