import Image from "next/image";
import Chatbot from './components/Chatbot';

import React from 'react';

export default function Home() {

    return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
       <Image
        aria-hidden
        src='/favicon.ico'
        alt='AI image box'
        width={33}
        height={33}
        />
      <main className="flex flex-col gap-8 row-start-2 sm:items-center">
     
        <Chatbot/>
        <div className='flex justify-center items-center'>Your AI APP That will include everything imaginable.</div>
      
      </main>
      <div className='flex  flex-row justify-around gap-3'>
        <div className='w-1/2'>
      <Image
        aria-hidden
        src='/favicon.ico'
        alt='AI image box'
        width={33}
        height={33}
        />
        </div>
        <div className='w-1/2'>
      <Image
        aria-hidden
        src='/favicon.ico'
        alt='AI image box'
        width={33}
        height={33}
        />
        </div>
      </div>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div className='bold'>Entertainment purposes only. <br />
        #AiEquality</div>
      </footer>
    </div>
  );
}
