import IdentitasTps from "../../components/manualcount/identitasTps";
import {COLORS} from "../../constants/theme";

export default function IdentitasTpsPusat() {
    return (
        <IdentitasTps tingkat="pusat" bgcolor={COLORS.yellowPusat} title="Input DPRD RI"/>
    );
}