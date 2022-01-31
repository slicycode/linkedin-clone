import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default function Home() {
  const router = useRouter()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user isn't authenticated
      router.push('/home')
    },
  })

  return (
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Feed | LinkedIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
          <Sidebar />
          <Feed />
        </div>
        {/* Widgets */}
      </main>
    </div>
  )
}

// prevents flickering on rendering
export async function getServerSideProps(context) {
  // Check if user is logged in
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    }
  }
  return {
    props: {
      session,
    },
  }
}
