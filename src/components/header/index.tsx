import Link from "next/link";
import React, { useRef } from "react";
import { GetMoveOrTvByParam } from "src/services/api";
import { ICON, IconSolid } from "src/utils/Icon";
import { signOut, useSession } from "next-auth/react";
import SearchBar from "../search";
import { useRouter } from "next/router";
interface Genre {
  name: string;
  id: number;
}
function Header() {
  const { data: session, status } = useSession();
  const {push, asPath}= useRouter();
  const [isTop, setisTop] = React.useState(false);
  const [isDrawerOpen, SetisDrawerOpen] = React.useState(false);
  const [genre, Setgenre] = React.useState([]);
  const [isOpengenre, SetIsOpengenre] = React.useState(false);
  const DrawerEle = useRef(null);
  React.useEffect(() => {
    window.addEventListener("scroll", (e) => {
      console.log(window.scrollY);
      if (Math.abs(window.scrollY) == 0) {
        setisTop(true);
      } else setisTop(false);
    });
    async function FetchApi() {
      try {
        let result = await GetMoveOrTvByParam({ href: "/genre/movie/list" });
        console.log(result.genres);
        Setgenre(result.genres);
      } catch (e) {}
    }
    FetchApi();
  }, []);

  return (
    <>
      <div className=" flex items-center justify-center xl:mx-[200px] z-[2] fixed top-0 left-0 right-0">
        {isDrawerOpen && (
          <div
            // ref={DrawerEle}
            className="h-screen flex justify-between  z-[3]  absolute left-0 top-0 bottom-0 right-0"
          >
            <div className="min-w-[100px] h-full bg-slate-300  ">
              <Link href={"/"}>
                <p className="hover:text-blue-400 text-black font-medium">
                  Home
                </p>
              </Link>
              <Link
                href={"/movie"}
                className="hover:text-blue-400 text-black mx-3"
              >
                <p>Movies</p>
              </Link>
              <Link
                href={"/tv"}
                className="hover:text-blue-400 text-black mx-3"
              >
                <p>TV Shows</p>
              </Link>
              <Link
                onMouseEnter={() => {
                  console.log("Enter Mouse");
                  SetIsOpengenre(true);
                }}
                onMouseLeave={() => {
                  console.log("Out");
                  SetIsOpengenre(false);
                }}
                href={""}
                className="hover:text-blue-400 text-black mx-3"
              >
                <div className="relative">
                  <p>Genre</p>
                  <div className="shadow-lg text-white  bg-[#1E2747] flex justify-between p-2">
                    <ul>
                      {genre.slice(0, 10).map((item: Genre, index: number) => {
                        return (
                          <Link
                            key={item.id}
                            href={`/genre/${item.name
                              .toLowerCase()
                              .replace(/\s/g, "")}/${item.id}?page=1`}
                          >
                            <li className="px-3 py-2 text-black  transition-all hover:text-[#075AB9] hover:bg-[rgb(21,27,50)]">
                              <p className="whitespace-normal text-xs">
                                {item.name}
                              </p>
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                    <ul>
                      {genre.slice(11).map((item: Genre, index: number) => {
                        return (
                          <Link
                            key={item.id}
                            href={`/genre/${item.name
                              .toLowerCase()
                              .replace(/\s/g, "")}/${item.id}?page=1  `}
                          >
                            <li className="px-3 py-2 transition-all text-black hover:text-[#075AB9] hover:bg-[rgb(21,27,50)]">
                              <p className="whitespace-normal text-xs">
                                {item.name}
                              </p>
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </Link>
              <Link href={""} className="flex hover:text-blue-400 mx-3">
                <p>Language</p>
              </Link>
            </div>
            <div
              onClick={() => {
                SetisDrawerOpen(false);
              }}
              className="flex-1 h-full bg-[#00000086]"
            ></div>
          </div>
        )}
        <div
          className={`w-full min-h-[50px] ${
            isTop ? "" : "bg-black "
          }flex items-center justify-between transition-all px-2 sm:px-0 py-3iS `}
        >
          <div
            onClick={() => {
              SetisDrawerOpen(true);
            }}
            className="block md:hidden text-white text-lg"
          >
            <ICON icon={IconSolid.faBars} />
          </div>
          <div className="hidden md:flex items-center ">
            <Link href={"/"}>
              <p className="hover:text-blue-400 font-medium">Home</p>
            </Link>
            <Link href={"/movie"} className="hover:text-blue-400 mx-3">
              <p>Movies</p>
            </Link>
            <Link href={"/tv"} className="hover:text-blue-400 mx-3">
              <p>TV Shows</p>
            </Link>
            <Link
              onMouseEnter={() => {
                console.log("Enter Mouse");
                SetIsOpengenre(true);
              }}
              onMouseLeave={() => {
                console.log("Out");
                SetIsOpengenre(false);
              }}
              href={""}
              className="hover:text-blue-400 mx-3"
            >
              <div className="relative">
                <p>Genre</p>
                {isOpengenre && (
                  <div className="shadow-lg text-white absolute top-full bg-[#1E2747] flex justify-between p-2">
                    <ul>
                      {genre.slice(0, 10).map((item: Genre, index: number) => {
                        return (
                          <Link
                            key={item.id}
                            href={`/genre/${item.name
                              .toLowerCase()
                              .replace(/\s/g, "")}/${item.id}?page=1`}
                          >
                            <li className="px-3 py-2  transition-all hover:text-[#075AB9] hover:bg-[rgb(21,27,50)]">
                              <p className="whitespace-normal text-xs">
                                {item.name}
                              </p>
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                    <ul>
                      {genre.slice(11).map((item: Genre, index: number) => {
                        return (
                          <Link
                            key={item.id}
                            href={`/genre/${item.name
                              .toLowerCase()
                              .replace(/\s/g, "")}/${item.id}?page=1  `}
                          >
                            <li className="px-3 py-2 transition-all hover:text-[#075AB9] hover:bg-[rgb(21,27,50)]">
                              <p className="whitespace-normal text-xs">
                                {item.name}
                              </p>
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </Link>
            <Link href={""} className="flex hover:text-blue-400 mx-3">
              <p>Language</p>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <SearchBar />
            {status === "authenticated" ? (
              <>
                <div className="relative">
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="w-10 h-10 rounded-full"
                    src={session?.user?.image as string}
                    alt="Rounded avatar"
                  ></img>
                  <ul className="absolute top-[calc(100%_+_10px)] bg-white min-h-[30px] right-0 ">
                    <li onClick={async ()=>{
                      await signOut();
                      push("/")
                      
                    }} className="h-5 px-3  block">
                      <p className="font-medium text-xs whitespace-nowrap">
                        Sign Out
                      </p>
                    </li>
                  </ul>
                </div>
              </>
               
            ) : (
              <Link href={`/signin`}>
                <p className="text-white  font-medium">Sign In</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
