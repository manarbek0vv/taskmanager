const TeamMembersHeader = () => {

    return (
        <div className={`flex justify-between items-center gap-8`}>
            <h1 className={`text-2xl font-['PoppinsSemiBold']`}>Team Members</h1>

            <button className={`cursor-pointer text-[13px] font-['PoppinsMedium'] border-gray-100 border-1 rounded-md gap-2 flex items-center px-3 py-2 bg-lime-200`}>
                <img className={`size-4`} src="/icons/document-icon.png" />
                Download report
            </button>
        </div>
    )
}

export default TeamMembersHeader