import Icon from "components/Icons/Icons";

export default function Footer() {
  return (
    <footer className="container mx-auto grid md:grid-cols-2 place-items-center justify-start bg-transparent text-white py-5 px-10">
      <section className="flex my-2 flex-wrap order-1 md:order-0">
        <section className="mx-2 my-2">
          <p className="text-black dark:text-white">DeSoc manager</p>
          <a
            href="#"
            target="_blank"
            rel="noopener"
            className="text-neutrals-gray-5 text-xs"
          >
            Terms and Services
          </a>
        </section>
        <section className="mx-2 my-2 self-end">
          <a
            href="#"
            target="_blank"
            rel="noopener"
            className="text-neutrals-gray-5 text-xs"
          >
            Privacy and Cookiess
          </a>
        </section>
        <section className="flex mx-2 my-2">
          <a
            href="#"
            target="_blank"
            rel="noopener"
            className="text-neutrals-gray-5 text-xs self-end"
          >
            Cookie Settings
          </a>
        </section>
      </section>
      <section className="flex order-0 md:order-1">
        <a
          href="#"
          target="_blank"
          rel="noopener"
          className="mx-2 dark:bg-tint-primary p-1 w-[25px] h-[25px] rounded-full flex items-center justify-center"
        >
          <Icon type="GitBook" className="text-black" />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener"
          className="mx-2 dark:bg-tint-primary pt-1 w-[25px] h-[25px] rounded-full flex items-center justify-center"
        >
          <Icon type="Github" color="black" />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener"
          className="mx-2 dark:bg-tint-primary p-1 w-[25px] h-[25px] rounded-full flex items-center justify-center"
        >
          <Icon type="Twitter" color="black" />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener"
          className="mx-2 dark:bg-tint-primary p-1 w-[25px] h-[25px] rounded-full flex items-center justify-center"
        >
          <Icon type="Discord" color="black" />
        </a>
      </section>
    </footer>
  );
}
