
function PostsWrapper({children} : {children : React.ReactNode}) {
  return (
    <main className="flex mt-2 flex-col md:grid gap-2 md:grid-cols-3 w-[90%] mx-auto">
        {children}
        </main>
  )
}

export default PostsWrapper