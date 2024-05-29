import { Envelope, GithubLogo, LinkedinLogo } from '@phosphor-icons/react'
import { ReactNode, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

function Footer() {

    let data = new Date().getFullYear()

    const { usuario } = useContext(AuthContext)

    let component: ReactNode

    if (usuario.token !== ""){
        component = (
            <div className="flex justify-center bg-footer">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-lg font-bold'>
                            Blog Raie | &copy; Copyright: {data}
                    </p>
                    <p className='text-sm'>Conheça as minhas Redes Sociais</p>
                    <div className='flex gap-2'>
                        <a href="https://www.linkedin.com/in/thaisqusi/" target="_blank">
                            <LinkedinLogo size={38} weight='bold' />
                        </a>
                        <a href="https://github.com/Thaisraie" target="_blank">
                            <GithubLogo size={38} weight="bold" />
                        </a>
                        <a href="mailto:thaisdivino21@gmail.com">
                            <Envelope size={38} weight="bold" />
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            { component }
        </>
    )
}

export default Footer