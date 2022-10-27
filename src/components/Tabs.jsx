import React, { useState } from 'react'
import Breeds from '../Pages/Breeds'
import Vote from '../Pages/vote'
import Favourites from '../Pages/Favourites'
import Upload from '../Pages/Upload'
import Search from '../Pages/Search'


const Tabs = () => {

    const [currentTab, setCurrentTab] = useState('1')
    const tabs = [

        {
            id: 1,
            tabTitle: 'Vote',
            title: 'Vote',
            content: 'This is Content of Tab 1 '
        },
        {

            id: 2,
            tabTitle: 'BREEDS',
            title: 'BREEDS',
            content: 'This is Content of Tab 2 '
        },
        {

            id: 3,
            tabTitle: 'IMAGE/SEARCH',
            title: 'IMAGE/SEARCH',
            content: 'This is Content of Tab 3 '
        },
        {

            id: 4,
            tabTitle: 'FAVOURITES',
            title: 'FAVOURITES',
            content: 'This is Content of Tab 4 '
        },
        {

            id: 5,
            tabTitle: 'UPLOAD',
            title: 'UPLOAD',
            content: 'This is Content of Tab 4 '
        }


    ]

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id)
    }

    return (
        <div className='container'>
            <div className='tabs'>

                {tabs.map((tab, i) => {
                    return <button key={i}
                        id={tab.id}
                        disabled={currentTab === `${tab.id}`}
                        onClick={(handleTabClick)}>
                        {tab.tabTitle}
                    </button>
                })}

            </div>

            <div className='content'>
                {tabs.map((tab, i) => {
                    return <div key={i}>
                        {currentTab === `${tab.id}` &&
                            <div>
                                {tab.tabTitle==='BREEDS'?<Breeds/>:tab.tabTitle==='Vote'?<Vote/>:tab.tabTitle==='IMAGE/SEARCH'?<Search/>:tab.tabTitle==='FAVOURITES'?<Favourites/>:<Upload/>}
                            </div>}
                    </div>
                })}

            </div>

        </div>
    )
}
export default Tabs