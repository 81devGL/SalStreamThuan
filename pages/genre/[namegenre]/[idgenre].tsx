import React from "react";
import { LayoutBasic, Mainlayout } from "src/Layout";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { GetListByIdGenre } from "src/services/api";
import { ListSkeleton, LoadingLayer, MovieItem, Pagination, WrapperGrid } from "src/components";
import { useRouter } from "next/router";
import { MovieModel, ResultMovieModel } from "src/Model";
interface Props {
  data?: any;
}

function DetailGenrePage() {
  const router = useRouter();
  const { namegenre, idgenre, page } = router.query;
  const [isLoading, SetisLoading] = React.useState(false);

  console.log(namegenre, idgenre, page, parseInt(page as string), "[QUERY]");
  console.log(router.query);
  const [properties, Setproperties] = React.useState<ResultMovieModel>();
  React.useEffect(() => {
    async function FetchApi() {
      try {
        SetisLoading(true);

        let results: ResultMovieModel = await GetListByIdGenre(
          idgenre as string,
          page ? (page as string) : "1"
        );
        Setproperties(results);
      } catch (e) {
        throw e;
      } finally {
        SetisLoading(false);
      }
    }
    FetchApi();
  }, [page, idgenre]);
  return (
    <>
      <LayoutBasic>
        {isLoading && <LoadingLayer />}
        <WrapperGrid>
          <h1 className="text-white capitalize font-medium">
            Most View {namegenre}
          </h1>
          <div className="flex flex-wrap">
            {isLoading ? (
              <ListSkeleton />
            ) : (
              properties?.results.map((item: MovieModel, index: number) => {
                return (
                  <>
                    <MovieItem item={item} key={index} />
                  </>
                );
              })
            )}
          </div>
          <Pagination
            href={`/genre/${namegenre}/${idgenre}`}
            totalPages={properties?.total_pages}
            currentPage={page != undefined ? parseInt(page as string) : 1}
          />
        </WrapperGrid>
      </LayoutBasic>
    </>
  );
}

export default DetailGenrePage;
