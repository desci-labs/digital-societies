export default function TransactionLink(props: { name: string; url: string }) {
  return (
    <div className="flex items-center justify-center mt-4">
      <a
        className="text-curious-blue text-md font-semibold"
        rel="noreferrer"
        href={props.url}
        target="_blank"
      >
        view transaction status
      </a>
    </div>
  );
}
