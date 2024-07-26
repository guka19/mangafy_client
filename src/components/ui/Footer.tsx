const Footer = () => {

    const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 flex justify-center items-center py-10">
        <div className="flex flex-col justify-center items-center space-y-2">
            <a className="font-bold text-xl 2xl:text-2xl cursor-pointer text-slate-900 bg-white p-2" href="/">MANGAFY.GE</a>
            <span className="text-white">All rights reserved&copy; {currentYear}</span>
        </div>
    </footer>
  )
}

export default Footer