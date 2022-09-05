import type { NextPage } from 'next';
import { forwardRef, HTMLProps } from 'react';
import { useFormContext } from 'react-hook-form';
import { MetadataValues } from './types';

export default function LaunchForm() {
  const { register, formState: { isSubmitting, isValid, errors } } = useFormContext<MetadataValues>();
  console.log(errors);
  return (
    <div className="container mx-auto flex flex-col gap-5">
      <h1 className="text-3xl font-bold mt-5 text-center">Launch org Demo</h1>
      <div className='mx-auto flex justify-center w-400'>
        <form className='w-full'>
          <label className="block flex flex-col gap-2 items-start mt-10" htmlFor="issuer">
            <LabelText text='Issuer:' />
            <Input
              id="issuer"
              value="descilabs.eth"
              disabled
            />
          </label>
          <label className="block flex flex-col gap-2 items-start mt-5" htmlFor="name">
            <LabelText text='Name:' />
            <Input
              id="name"
              placeholder="Organisation name (e.g Ethereum foundation)"
              {...register('name')}
            />
          </label>
          <label className="block flex flex-col gap-2 items-start mt-5" htmlFor="description">
            <LabelText text='Description:' />
            <Input
              id="description"
              placeholder="About org"
              {...register('description')}
            />
          </label>
          <label className="block flex flex-col gap-2 items-start mt-5" htmlFor="external_link">
            <LabelText text='External link' />
            <Input
              id="external_link"
              placeholder="website or social media url"
              {...register('external_link')}
            />
          </label>
          <label className="block flex flex-col gap-2 items-start mt-5" htmlFor="image">
            <LabelText text='Image:' />
            <Input
              id="image"
              type='file'
              className='appearance-none opacity-0 h-0 w-0 group'
              {...register('image')}
            />
            <div className='py-1.5 px-4 w-full flex flex-col items-center rounded-xl border-2 border-cornflower-blue'>
              <span className='block text-center my-2'>Drag and drop file</span>
              <span className='block text-center my-2'>OR</span>
              <span className='block text-center my-2 border-2 cursor-pointer w-72 rounded-lg hover:border-cornflower-blue'>Choose file</span>
            </div>
          </label>
          <Button disabled={isSubmitting || !isValid} className='mt-4 w-full bg-black disabled:bg-regent-gray'>Deploy</Button>
        </form>
      </div>
    </div>
  );
};


function Button(props: HTMLProps<HTMLButtonElement>) {
  return (
    <button onClick={props.onClick} disabled={props.disabled} className={`tracking-wide text-lg text-white rounded-lg w-32 py-1.5 px-4 enabled:bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 outline-none hover:bg-400p hover:animate-gradient ${props.className ?? props.className} `}>
      {props.children}
    </button>
  );
}

const Input = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>((props, ref) => {
  return <input
    ref={ref}
    type="text"
    className="py-1.5 px-4 w-full rounded-xl border-2 focus:border-cornflower-blue my-1 outline-none"
    {...props}
  />
})

function LabelText({ text }: { text: string }) {
  return <span className='text-lg cursor-pointer font-semibold'>{text}</span>;
}