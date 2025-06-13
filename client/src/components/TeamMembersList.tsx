import { useContext, useEffect, useState } from "react";
import TeamMembersItem from "./TeamMembersItem";
import { IUser } from "../definitions/interfaces";
import UsersService from "../services/users.service";
import { Context } from "../main";

const TeamMembersList = () => {
    const { auth } = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        UsersService.findUsersInRoom(auth.user.roomId)
            .then(res => setUsers(res.data));
    }, [])

    return (
        <div className={`overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-scrollbar-width]:hidden overflow-y-auto gap-4 auto-rows-auto grid grid-cols-3 w-full`}>
            {users.map(user =>
                <TeamMembersItem user={user} key={user.id} />
            )}
        </div>
    )
}

export default TeamMembersList