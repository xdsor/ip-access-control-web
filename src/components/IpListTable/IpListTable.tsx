import {IpListEntry} from "../IpListEntry/IpListEntry.tsx";
import {IIpAccess} from "../../model/IpAccess.ts";

type IpListTableProps = {
    ipAccessList: IIpAccess[]
}

export const IpListTable = ({ipAccessList}: IpListTableProps) => (
    <table className="table">
        <thead>
        <tr>
            <th scope="col">IP</th>
            <th scope="col">Issued for</th>
            <th scope="col">Date created</th>
            <th scope="col">Active</th>
        </tr>
        </thead>
        <tbody>
        {
            ipAccessList.map(entry => <IpListEntry ipAccess={entry} key={entry.id}/>)
        }
        </tbody>
    </table>
)