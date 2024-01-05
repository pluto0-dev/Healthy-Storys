const Links = () => {
    const links = [
        {
        title: 'Homepage',
        path: '/',
    },
    {
        title: 'About Us',
        path: '/about',
    },
    {
        title: 'Blogs',
        path: '/blogs',
    },
    {
        title: 'Login',
        path: '/login',
    },
    {
        title: 'Register',
        path: '/register',
    },
]
    return(
        <div>
            {links.map((links => (
                <Link href={links.path}>{links.title}</Link>
            )))}
        </div>
        
    )
}
export default Links