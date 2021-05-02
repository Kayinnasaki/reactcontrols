function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}

const Userlist = ({ userlist, last, set, idle }) => {
    let list = [...new Set(userlist)]
    list = list.map((user) => {
        let classlist = "user"
        if (user === last) {
            classlist = classlist + " last"
            setTimeout(() => { set({ last: "" }); }, 500);
        }

        const count = getOccurrence(userlist, user)
        let concurrent = ""
        if (count > 1) {
            concurrent = <div className='ulcon'>{count}</div>
        }

        return (
            <div key={user} className={classlist} id={user}>{user} {concurrent}</div>)
    })

    return (
        <div className="userlist">
            {list}
            <div className={idle ? "idleStatus" : "hidden idleStatus"} >User Idle<br/>Auto Updating...</div>
        </div>
    )
}

export default Userlist