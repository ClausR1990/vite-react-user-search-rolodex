import React, { useEffect, useState } from 'react'

interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    age: number
    image: string
}

const App = () => {
    const [users, setUsers] = useState<User[] | null>(null)
    const [searchTerm, setSearchTerm] = useState<string>('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://dummyjson.com/users/search?q=${searchTerm}&select=firstName,lastName,age,email,image`
                )
                const data = await response.json()
                if (!data) return
                setUsers(data.users)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()

        return () => {}
    }, [searchTerm])

    const updateSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length < 3) {
            setSearchTerm('')
        }

        setSearchTerm(e.target.value)
    }

    return (
        <main className='bg-zinc-900 min-h-screen w-full'>
            <section className='py-24'>
                <div className='container text-center'>
                    <input
                        className='p-3 px-5 outline outline-gray-500 appearance-none rounded-md w-full'
                        type='text'
                        name='searchField'
                        onChange={(e) => updateSearchTerm(e)}
                        placeholder='Search...'
                    />
                    {users && users?.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-12'>
                            {users.slice(0, 8).map((user) => (
                                <div
                                    className='p-6 bg-slate-600 rounded-lg border border-slate-200'
                                    key={user.id}
                                >
                                    <div>
                                        <img
                                            className='w-full aspect-square object-contain mb-8'
                                            src={user.image}
                                        />
                                    </div>
                                    <h2 className='text-white font-bold'>{`${user.firstName} ${user.lastName} | ${user.age}`}</h2>
                                    <a>{user.email}</a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text-white'>No user found 😥</p>
                    )}
                </div>
            </section>
        </main>
    )
}

export default App
