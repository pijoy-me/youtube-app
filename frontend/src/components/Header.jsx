import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Input } from "../index"

function Header() {
  const [toggleBarCss, setToggleBarCss] = useState("left-[-20rem]")
  const [coverAll, setCoverAll] = useState("")

  function toggleSideBar() {
    toggleBarCss == "left-[-20rem]" ? setToggleBarCss("left-[0]") : setToggleBarCss("left-[-20rem]")
  }

  useEffect(() => {
    if (toggleBarCss == "left-[0]") {
      setCoverAll("!bg-[#2c2c2c3f] h-screen top-[-73px] relative")
    }else{
      setCoverAll("")
    }
  }, [toggleBarCss])



  useEffect(() => {
    function handleClickOutside(e) {
      if (!e.target.closest("#logo-sidebar") && !e.target.closest("#mainMenu")) {
        setToggleBarCss("left-[-20rem]");
      }

      if (e.target.closest(".slideLeft")) {
        setToggleBarCss("left-[-20rem]");
      }

    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className=''>
        <div>
          <div className='flex text-white items-center justify-between px-7 pt-2 pb-5 text-[1.11rem] bg-[#0f0f0f] shadow-xl'>
            <div className='flex items-center gap-8'>
              <button id='mainMenu' onClick={toggleSideBar}>
                <img src="menubar.svg" alt="" />
              </button>
              <Link to={""} className='flex items-center gap-1'>
                <img className='w-[2.5rem]' src="youtube-video.svg" alt="" srcSet="" />
                <span>Watch-here</span>
              </Link>
            </div>

            <div className='flex relative'>
              <Input
                className="w-[50vw] rounded-full bg-[#00000000] h-11 px-5 text-[1.1rem] outline-none border-[#8d8d8d] border-[1px] text-white"
                placeholder="Search"
              />
              <button className='absolute right-0 text-center mt-[0.60rem] mr-6'>
                <img className='' src="search.svg" alt="" />
              </button>
            </div>

            <div className='flex gap-5'>
              <button>
                <img src="uploadVideo.svg" alt="" />
              </button>
              Profile
            </div>
          </div>
        </div>


        <div className={`${coverAll}`}>
          <aside id="logo-sidebar" className={`fixed overflow-hidden top-0 ${toggleBarCss} w-64 h-screen transition-all`} aria-label="Sidebar">
            <div className="h-full px-3 py-4 bg-gray-50 dark:bg-[#0e0e0e]">

              <div className='flex items-center pb-5 gap-5 pl-1'>
                <div>
                  <img onClick={toggleSideBar} className='cursor-pointer' src="menubar.svg" alt="" />
                </div>

                <a href="https://flowbite.com/" className="flex items-center ps-2.5">
                  <div className='flex items-center gap-1'>
                    <img className='w-[2.5rem]' src="youtube-video.svg" alt="" srcSet="" />
                    <span className='text-white text-[1.1rem]'>Watch-here</span>
                  </div>
                </a>
              </div>

              <ul className="space-y-2 h-[88vh] font-medium pb-3 overflow-auto">
                <li>
                  <Link to="/" className="flex slideLeft items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group">
                    <img src="home.svg" alt="" />
                    <span className="ms-3">Home</span>
                  </Link>
                </li>
                <li>
                  <Link to={""} className="flex slideLeft items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group">
                    <img src="subscription.svg" alt="" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Subscriptions</span>
                  </Link>
                </li>
                <div className='border-[0.2px] opacity-10'></div>

                <div className='flex text-xl items-center w-[5rem] mt-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group p-2 cursor-pointer'>
                  <div className=''>
                    You
                  </div>
                  <img src="chevronRight.svg" alt="" />
                </div>
                <li>
                  <Link to={""} className="flex slideLeft items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group">
                    <img src="currentUser.svg" alt="" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Your channel</span>
                  </Link>
                </li>
                <li>
                  <Link to={""} className="flex slideLeft items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group">
                    <img src="history.svg" alt="" />
                    <span className="flex-1 ms-3 whitespace-nowrap">History</span>
                  </Link>
                </li>
                <li>
                  <Link to={""} className="flex slideLeft items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group">
                    <img src="playlist.svg" alt="" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Playlist</span>
                  </Link>
                </li>
                <li>
                  <Link to={""} className="flex slideLeft items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group">
                    <img src="videos.svg" alt="" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Your videos</span>
                  </Link>
                </li>
                <li>
                  <Link to={""} className="flex slideLeft items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group">
                    <img src="like.svg" alt="" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Liked videos</span>
                  </Link>
                </li>
                <li>
                  <Link to={""} className="flex slideLeft items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group">
                    <img src="download.svg" alt="" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Downloads</span>
                  </Link>
                </li>

                <div className='border-[0.2px] opacity-10'></div>
                <div className='flex text-xl items-center w-[9rem] mt-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group p-2 cursor-pointer'>
                  <div className=''>
                    Subscriptions
                  </div>
                </div>

                <li>
                  <Link to={""} className="flex slideLeft items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group">
                    <img src="like.svg" alt="" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Liked videos</span>
                  </Link>
                </li>
                <li>
                  <Link to={""} className="flex slideLeft items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#100628] group">
                    <img src="download.svg" alt="" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Downloads</span>
                  </Link>
                </li>

              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>

  )
}

export default Header
