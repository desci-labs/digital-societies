import { CardContainer } from "components/UI/Index";
import { Table, TBody, THead } from "components/UI/Table";
import { useGetOrgs } from "services/orgs/hooks";
import SocietyItem from "./SocietyItem";

export default function Societies() {
  const orgs = useGetOrgs();
  return (
    <CardContainer>
      <div className="flex justify-between items-center mb-5 text-neutrals-gray-7">
        <h1 className="text-left heading-2 pl-2">Societies</h1>
      </div>
      <Table>
        <THead rows={["Badge", "Name", "Address", "Disable"]} />
        <TBody>
          {orgs.map((org, idx) => (
            <SocietyItem key={idx} org={org} />
          ))}
        </TBody>
      </Table>
    </CardContainer>
  );
}
