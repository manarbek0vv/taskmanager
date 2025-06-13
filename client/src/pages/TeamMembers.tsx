import TeamMembersHeader from "../components/TeamMembersHeader"
import TeamMembersList from "../components/TeamMembersList"

const TeamMembers = () => {

    return (
        <div className={`flex flex-col gap-5 overflow-hidden px-5 w-full h-full py-8`}>
            <TeamMembersHeader />
            <TeamMembersList />
        </div>
    )
}

export default TeamMembers