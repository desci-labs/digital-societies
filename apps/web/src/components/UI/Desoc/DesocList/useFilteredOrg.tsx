import sanitizeRegexSearchText from "helper/sanitizeRegexSearchText";
import useDebouncer from "hooks/useDebouncer";
import { useMemo, useState } from "react";
import { useGetAdminSocietiesQuery } from "services/api/admin";
import { useGetOrgState } from "services/orgs/hooks";

const DELAY = 250;
export default function useFilteredOrg() {
  const [searchText, setSearchText] = useState("");
  const { data: orgList, isLoading } = useGetOrgState();
  const [debouncedSearchText, isDebouncing] = useDebouncer(searchText, DELAY);
  const { data: societies, isLoading: isLoadingSettings } =
    useGetAdminSocietiesQuery({}, {});

  const filteredList = useMemo(() => {
    const sanitizedText =
      sanitizeRegexSearchText(debouncedSearchText).toLowerCase();

    return orgList
      .filter((org) =>
        !societies
          ? true
          : Array.isArray(societies) &&
            !societies.find(
              (society) =>
                society.address === org.address && society.disabled === true
            )
      )
      .filter(
        (org) =>
          org.address.toLowerCase().search(sanitizedText) !== -1 ||
          org.admin.toLowerCase().search(sanitizedText) !== -1 ||
          org.metadata.name.toLocaleLowerCase().search(sanitizedText) !== -1 ||
          org.metadata?.description
            .toLocaleLowerCase()
            .search(sanitizedText) !== -1
      )
      .sort((orgA, orgB) => Number(orgB.verified) - Number(orgA.verified));
  }, [debouncedSearchText, orgList, societies]);

  function handleSearchTextChange(text: string) {
    setSearchText(text);
  }

  return {
    searchText,
    handleSearchTextChange,
    filteredList,
    isLoading: isLoading || isLoadingSettings,
    isDebouncing,
    isEmpty: orgList.length === 0 && isLoading === false,
  };
}
