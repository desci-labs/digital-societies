import AddressCopier from "components/Copier/AddressCopier";
import { Cell, Row } from "components/UI/Table";
import { getImageURL } from "helper";
import Image from "next/image";
import { useGetOrgSetting } from "services/api/hooks";
import { Org, PendingOrg } from "services/orgs/types";
import { ToggleVerification, ToggleVisibility } from "./ActionButtons";

export default function SocietyItem(props: { org: Org | PendingOrg }) {
  const { data: society } = useGetOrgSetting(props.org.address);
  return (
    <Row
      className={`border-none table-row ${
        society?.disabled
          ? "bg-neutrals-gray-2 dark:bg-neutrals-gray-6 bg-opacity-20 line-through"
          : ""
      }`}
    >
      <Cell className="flex justify-start p-2">
        <div className="w-10 h-10 relative bg-gradient rounded-full">
          <Image
            src={getImageURL(props.org.metadata.image)}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt={`${props.org.metadata.name} image`}
            className="rounded-full block"
          />
        </div>
      </Cell>
      <Cell>{props.org.metadata.name}</Cell>
      <Cell>
        <AddressCopier address={props.org.address} />
      </Cell>
      <Cell className="flex items-center">
        <ToggleVisibility address={props.org.address} />
        <ToggleVerification society={props.org} />
      </Cell>
    </Row>
  );
}
