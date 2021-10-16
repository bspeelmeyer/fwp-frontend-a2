import React, {useState, useEffect} from "react";
import SpinningCircles from "react-loading-icons/dist/components/spinning-circles";
import { useHistory } from "react-router";
import { getUsers, getFollows, createFollow, deleteFollow } from "../data/repository";

const Follow = (props) => {
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [follows, setFollows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [value, setValue] = useState(0);

   

    useEffect(() => {
        const user = {
            user_name: props.user.user_name,
        };
        async function loadUsersFollowers() {
            const currentUsers = await getUsers(user);
            const currentFollows = await getFollows(user);

            setUsers(currentUsers);
            setFollows(currentFollows);
            setIsLoading(false);
        }
      
        loadUsersFollowers();
    },[value,props.user.user_name]);

    const userExists = (user_name) => {
        return follows.some(function(element){
            return element.followed === user_name;
        });
    }

    const handleFollow = (user_name) => {
        const follow = {
            follower: props.user.user_name,
            followed: user_name,
        }

        async function createNewFollow() {
            await createFollow(follow);
        }
        createNewFollow();
        setValue(value + 1);
        setTimeout(function(){
            props.setValue(props.value + 1);
        },500);
       
    }

    const handleUnfollow = (user_name) => {
        const follow = {
            follower: props.user.user_name,
            followed: user_name,
        }

        async function deleteOldFollow() {
            await deleteFollow(follow);
        }
        deleteOldFollow();
        props.setValue(props.value + 1);
        setValue(value + 1);
    }

    if(props.user == null){
        history.push("/signin");
    }

    return(
        <div className="container">
            <div className="row bg-dark text-white">
                <h2>User List</h2>
            </div>
            {isLoading ? (
                <div>
                    <SpinningCircles />
                </div>
            ): (
                users.map((x) => (
                    <div className="container">
                        <div className="card">
                            <h5 className="card-header bg-dark text-white">{x.user_name}</h5>
                            <div className="card-footer bg-dark text-white">
                                <div className="row">
                                    {userExists(x.user_name) ? (
                                        <div onClick={() => handleUnfollow(x.user_name)} className="col-1 px-1 text-end">
                                            <h4><i className="bi bi-person-x"></i></h4>
                                        </div>
                                    ): (
                                        <div onClick={() => handleFollow(x.user_name)} className="col-1 px-1 text-end">
                                            <h4><i className="bi bi-person-plus"></i></h4>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default Follow;