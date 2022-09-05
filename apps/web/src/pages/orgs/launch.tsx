import type { NextPage } from 'next';
import { HTMLProps } from 'react';

const Launch: NextPage = () => {
  return (
    <div className="container mx-auto flex flex-col gap-5">
      <h1 className="text-3xl font-bold my-5">Launch org Demo</h1>
      <div className='mx-auto flex justify-center w-400'>
        <form className='w-full'>
          <h2 className='text-2xl'>ISSUER: <b>DeSci Labs</b></h2>
          <label className="block flex flex-col gap-2 items-start mt-10" htmlFor="name">
            <span className='text-lg'>Name:</span>
            <Input
              id="name"
              placeholder="Organisation name (e.g Ethereum foundation)"
            />
          </label>
          <label className="block flex flex-col gap-2 items-start mt-5" htmlFor="description">
            <span className='text-lg'>Description:</span>
            <Input
              id="description"
              placeholder=""
            />
          </label>
          <label className="block flex flex-col gap-2 items-start mt-5" htmlFor="externalLink">
            <span className='text-lg'>external link:</span>
            <Input
              id="externalLink"
              placeholder="website or social media url"
            />
          </label>
          <label className="block flex flex-col gap-2 items-start mt-5" htmlFor="image">
            <span className='text-lg'>Image:</span>
            <Input
              id="image"
              type='file'
              placeholder="website or social media url"
              className='appearance-none opacity-0 h-0 w-0 group'
            />
            <div className='py-1.5 px-4 w-full flex flex-col items-center rounded-xl border-2 group-focus:border-cornflower-blue hover:border-cornflower-blue my-1'>
              <span className='block text-center my-2'>Drag and drop file</span>
              <span className='block text-center my-2'>OR</span>
              <span className='block text-center my-2 border-2 cursor-pointer w-72 rounded-lg hover:border-cornflower-blue'>Choose file</span>
            </div>
          </label>
          <Button className='mt-4 w-full'>Deploy</Button>
        </form>
      </div>
    </div>
  );
};

export default Launch;


function Button(props: HTMLProps<HTMLButtonElement>) {
  return (
    <button onClick={props.onClick} className={`tracking-wide text-lg text-white rounded-lg w-32 py-1.5 px-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 outline-none hover:bg-400p hover:animate-gradient ${props.className ?? props.className} `}>
      {props.children}
    </button>
  );
}

function Input(props: HTMLProps<HTMLInputElement>) {
  return <input
    type="text"
    className="py-1.5 px-4 w-full rounded-xl border-2 focus:border-cornflower-blue my-1 outline-none"
    {...props}
  />
}