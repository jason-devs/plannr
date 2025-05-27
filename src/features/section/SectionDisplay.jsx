import useSection from "./useSection";

function SectionDisplay() {
  const { sections, isFetchingSections } = useSection();

  return (
    <ul className="flex flex-col gap-3">
      {isFetchingSections && <span>Loading...</span>}
      {sections?.map(section => (
        <li key={section._id}>
          <span className="font-black">{section.name}</span>
          <span className="text-xs">{` - ${section.description}`}</span>
        </li>
      ))}
    </ul>
  );
}

export default SectionDisplay;
