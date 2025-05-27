import { useQuery } from "@tanstack/react-query";
import { getAll } from "../services/apiFactory";
import TechCard from "../features/tech/TechCard";
import { useState } from "react";

function Techs() {
  const [search, setSearch] = useState("");

  const {
    data: techs = [],
    isPending: isPendingTechs,
    isError: isErrorTechs,
  } = useQuery({
    queryKey: [`Techs`],
    queryFn: async () => await getAll("tech", {}),
  });

  const filteredTechs = techs?.filter(tech => {
    if (search === "") return true;
    return tech.name.toLowerCase().startsWith(search.toLowerCase());
  });

  if (isPendingTechs) {
    return <span>Loading...</span>;
  }

  if (isErrorTechs) {
    return <span>Techs fucked!</span>;
  }

  return (
    <div className="flex flex-col gap-3">
      <input
        type="search"
        placeholder="🔎 Search techs..."
        className="w-full rounded-full border px-3 py-1"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select className="w-50 rounded-sm border p-1">
        <option>Filter by...</option>
        <option>Language</option>
        <option>Framework</option>
        <option>Runtime</option>
        <option>Developer Tool</option>
        <option>Library</option>
      </select>
      <ul className="flex flex-wrap gap-2">
        {filteredTechs?.map(tech => (
          <li key={tech._id}>
            <TechCard tech={tech} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Techs;
