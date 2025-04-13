import closeSVG from '../assets/close.svg'
import iceice from '../assets/iceice.jpeg'
import iceSVG from '../assets/ice.svg'
import developerSVG from '../assets/developer2.svg'
import projectSVG from '../assets/project.svg'
import techSVG from '../assets/tech.svg'
import reactSVG from '../assets/react.svg'
import cssSVG from '../assets/css.svg'
import djangoSVG from '../assets/django.svg'
import mysqlSVG from '../assets/mysql.svg'

function InfoModal({ onClose }){

    return(
        <>
            <div className="black-bg" onClick={onClose}></div>
            <div className="login-modal form">
                <img className="closeSVG" src={closeSVG} onClick={onClose}/>
                <h1>About</h1>
                <div className="vertical-center">
                    <div className='header-with-img'>
                        <img src={developerSVG} alt="" />
                        <span className='bold'>Developer</span>
                    </div>
                    
                    <img src={iceice} className='developer' />
                    <div className='name-with-ice'>
                        <img src={iceSVG} className='mini-ice'/>
                        <a href='https://www.tiktok.com/@dev.iceice?is_from_webapp=1&sender_device=pc' target='_blank'>
                            <span id='ice'>@dev.iceice</span>
                        </a>
                    </div>

                    <div className="header-with-img mt30">
                        <img src={projectSVG} />
                        <span className='bold'>Project Status</span>
                    </div>
                    <span className='status'>Not Complete</span>

                    <div className="header-with-img mt30">
                        <img src={techSVG} />
                        <span className="bold">Tech Stack</span>
                    </div>
                    
                    <div className="tech-container">
                        <div className="tech-img-name">
                            <img src={reactSVG}/>
                            <span className='tech-name'>React</span>
                        </div>
                        <div className="tech-img-name">
                            <img src={cssSVG}/>
                            <span className='tech-name'>CSS</span>
                        </div>
                        <div className="tech-img-name">
                            <img src={djangoSVG}/>
                            <span className='tech-name'>Django</span>
                        </div>
                        <div className="tech-img-name">
                            <img src={mysqlSVG}/>
                            <span className='tech-name'>MySQL</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default InfoModal