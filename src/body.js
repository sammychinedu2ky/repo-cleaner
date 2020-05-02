import React from 'react'
import { GetRepo, Login, DelRepo } from './Repos'
import { useState } from 'react';


const Body = () => {
    let [repos, setRepos] = useState([])
    let [delItems, setDelItems] = useState([])
    let [login, setLogin] = useState(false)


    async function oath(e) {
        e.preventDefault()
        await Login();
        setLogin(true)
    }
    async function setRepo(e) {
        if (!login) {
            alert('please login before you get repositories')
            return
        }
        e.preventDefault()
        let repo = await GetRepo()
        console.log(repo)
        setRepos(repo)
    }
    function addToList(index) {

        if (!delItems.includes(index)) {
            setDelItems([...delItems, index])

        }
        else {
            let arr = [...delItems]
            arr.splice(index, 1)

            setDelItems([...arr])
        }
        console.log(delItems.length, delItems)
    }

    function deleteRepo() {
        if (!login || repos.lenth==0) {
            alert('please login and click on get repo')
            return
        }
        let warn =prompt("Please do note that this process can't be undone, type 'yes' to delete");
        if(warn.trim().toLowerCase()!='yes') return
        let newArr = delItems.map(item => DelRepo(repos[item].full_name));
        Promise.all([...newArr])
            .then(result => {
                setDelItems([]);
                let updatedRepo = repos.filter((item, index) => {
                    return delItems.some(i => i != index)
                })
                let checkBox = document.getElementsByName('check')
                checkBox.forEach(item => {
                    item.checked = false
                })
                setRepos(updatedRepo)
                alert('selected repos deleted ')
            })

    }

    return (
        <React.Fragment>
            <div className="container">
                <nav className="navbar navbar-light navbar-expand-lg fixed bg-white clean-navbar">
                    <div className="container">
                        <a className="navbar-brand logo" href="#">Repo Cleaner</a>
                        <button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navcol-1">
                            <ul className="nav navbar-nav ml-auto">
                                <li className="nav-item ml-5" role="presentation">
                                    <a className="nav-link"  onClick={oath} href=''>Login</a>
                                </li>
                                <li className="nav-item ml-5" role="presentation">
                                    <a className="nav-link"  href='' id="GetRepo" onClick={setRepo}>Get Repo</a>
                                </li>
                                <li className="nav-item ml-5" role="presentation">
                                    <a className="nav-link"  href='https://github.com/sammychinedu2ky/repo-cleaner' >Fork @GitHub</a>
                                </li>
                 
                            </ul>
                        </div>
                    </div>
                </nav>
                <main className="page landing-page">
                    <div style={{marginTop:'3em'}}/>
                    <h3>Please Login to display your Repositories</h3>
                    <div className="table-responsive">

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name of Repo</th>
                                    <th>Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                {repos.length == 0 ? "" : repos.map((repo, index) => {

                                    return <tr key={index}>
                                        <td><a href={repo.html_url}>{repo.name}</a></td>
                                        <td><input type="checkbox" name='check' onClick={(e) => addToList(index)} /></td>
                                    </tr>
                                })}


                            </tbody>
                        </table>
                    </div>
                    <button className="btn btn-primary" type="button" onClick={deleteRepo} >Delete Repos</button>
                </main>
            </div>

        </React.Fragment>
    )
}
export default Body;