import { VerifiedBadgeIcon } from "assets/svg";
import { Tooltip } from "flowbite-react";

const VerfiedContent = (props: { isDelegate?: boolean }) => (
  <div className="flex items-center flex-col gap-3 p-4">
    <VerifiedBadgeIcon
      isDelegate={props.isDelegate}
      width="35"
      heigth="35"
      className="cursor-pointer"
    />
    <h1 className="font-bold text-xl">Verified SBT</h1>
    <span className="inline-block text-darker">
      This is a verified society, all sbts issued by this society is notable.{" "}
      <a
        href="#"
        target="_blank"
        rel="noopener"
        className="underline text-curious-blue"
      >
        Learn more
      </a>
    </span>
  </div>
);

export default function VerifiedBadge(props: {
  isDelegate?: boolean;
  size?: string;
}) {
  return (
    <Tooltip
      content={
        props.isDelegate ? (
          "The holder of this SBT can mint or revoke SBTs"
        ) : (
          <VerfiedContent isDelegate={props.isDelegate} />
        )
      }
      trigger="hover"
      placement="right"
      arrow={false}
      style="auto"
    >
      <VerifiedBadgeIcon
        isDelegate={props.isDelegate}
        width={props.size ?? "25"}
        heigth={props.size ?? "25"}
        className="cursor-pointer"
      />
    </Tooltip>
  );
}
