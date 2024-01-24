import IdentitasTps from "../../components/manualcount/identitasTps";
import {COLORS} from "../../constants/theme";

export default function IdentitasTpsPilpres() {
    return (
        <IdentitasTps tingkat="pilpres" bgcolor={COLORS.grayPilpres} title="Input Pilpres" />
    );
}