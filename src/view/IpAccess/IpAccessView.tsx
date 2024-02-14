import {IpListTable} from "../../components/IpListTable/IpListTable.tsx";
import {useGetAllIpAccessQuery} from "../../api/ipAccessApi.ts";


export const IpAccessView = () => {
    const {data = []} = useGetAllIpAccessQuery();

    return (
        <>
            <h1>IP access list</h1>
            {data.length == 0 ? <div>Nothing to display</div>
            : <IpListTable ipAccessList={data}/>}
        </>
    )
}