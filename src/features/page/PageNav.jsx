import { NavLink } from "react-router-dom";
import usePage from "./usePage";
import Tag from "../../ui/Tag";
import { HiX } from "react-icons/hi";
import { HiBars2 } from "react-icons/hi2";

function PageNav({ pageMode }) {
  const { pages, deletePage, isPendingDeletePage, variablesDeletePage } =
    usePage();

  function handleDeletePage(id) {
    deletePage(id);
  }

  return (
    <nav className="flex flex-wrap gap-3">
      {pages?.map(page => (
        <Tag key={page._id} mode={pageMode}>
          <div
            className={`flex items-center gap-2 rounded-sm border border-dashed px-2 py-1 ${isPendingDeletePage && variablesDeletePage === page._id && "opacity-50"}`}
          >
            <NavLink to={`page/${page._id}`}>{page.name}</NavLink>
            <Tag.Button>
              <button
                name="delete"
                className="h-full border-l border-dashed pl-2"
                onClick={() => handleDeletePage(page._id)}
                disabled={isPendingDeletePage}
              >
                <HiX />
              </button>
              <button
                name="reorder"
                className="h-full border-l border-dashed pl-2"
              >
                <HiBars2 />
              </button>
            </Tag.Button>
          </div>
        </Tag>
      ))}
    </nav>
  );
}

export default PageNav;
