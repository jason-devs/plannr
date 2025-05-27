import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getOne } from "../services/apiFactory";

function Component() {
  const { componentId } = useParams();

  const {
    data: component,
    isPending: isPendingComponent,
    isError: isErrorComponent,
  } = useQuery({
    queryKey: [`${componentId} Component`],
    queryFn: async () => await getOne("component", componentId),
  });

  if (isPendingComponent) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h2 className="text-2xl font-bold">Loading Component...</h2>
      </div>
    );
  }

  if (isErrorComponent) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h2 className="text-2xl font-bold">
          Something went wrong fetching this. Sorry.
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="mx-auto text-4xl">{component?.name}</h2>
    </div>
  );
}

export default Component;
