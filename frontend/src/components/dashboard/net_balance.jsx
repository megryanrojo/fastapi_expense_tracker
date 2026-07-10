import { useState, useEffect } from "react";

function NetBalance({ user }) {
    const [netBalance, setNetBalance] = useState(0);

    useEffect(() => {
        if (!user) return;

        function netBalance() {
            
        }

    }, [user]);


}
export default NetBalance;