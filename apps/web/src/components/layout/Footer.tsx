import Icon from "components/Icons/Icons";

export default function Footer() {
  return (
    <footer className="container mx-auto grid md:grid-cols-2 place-content-center md:place-content-between bg-transparent text-white py-5">
      <section className="flex my-2 flex-wrap order-1 md:order-0">
        <div className="mx-2 my-2">
          <p className="text-black dark:text-white">DeSoc Manager</p>
          <TextLink title="Terms of Services" />
        </div>
        <div className="mx-2 my-2 self-end">
          <TextLink title="Privacy and Cookies" />
        </div>
        <div className="mx-2 my-2 self-end">
          <TextLink title="Cookie Settings" />
        </div>
      </section>
      <section className="place-self-center md:mb-5 md:place-self-end flex order-0 md:order-1">
        {/* <a
          href="#"
          target="_blank"
          rel="noopener"
          className="mx-2 dark:bg-tint-primary p-1 w-[25px] h-[25px] rounded-full flex items-center justify-center"
        >
          <Icon type="GitBook" className="text-black" size={25} />
        </a> */}
        <a
          href="https://github.com/desci-labs/soulbound/tree/dev"
          target="_blank"
          rel="noreferrer"
          className="mx-2 dark:bg-tint-primary p-1 w-[25px] h-[25px] rounded-full flex items-center justify-center"
        >
          <Icon type="Github" color="black" />
        </a>
        <a
          href="https://twitter.com/DeSciLabs"
          target="_blank"
          rel="noreferrer"
          className="mx-2 dark:bg-tint-primary p-1 w-[25px] h-[25px] rounded-full flex items-center justify-center"
        >
          <Icon type="Twitter" color="black" />
        </a>
        <a
          href="https://discord.gg/vgFXyTpj"
          target="_blank"
          rel="noreferrer"
          className="mx-2 dark:bg-tint-primary p-1 w-[25px] h-[25px] rounded-full flex items-center justify-center"
        >
          <Icon type="Discord" color="black" />
        </a>
      </section>
    </footer>
  );
}

const TextLink = (props: { title: string }) => (
  <a
    href="#"
    target="_blank"
    rel="noopener"
    className="text-neutrals-gray-5 text-xs hover:underline"
  >
    {props.title}
  </a>
);
