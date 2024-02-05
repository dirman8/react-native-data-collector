import { PKB, GERINDRA, PDIP, GOLKAR, NASDEM, PARTAI_BURUH, GELORA, PKS, PKN, HANURA, PARTAI_GARUDA, PAN, PBB, DEMOKRAT, PSI, PERINDO, PPP, PARTAI_UMMAT } from '../../constants/calegPusat';
import ManualCount4 from "../../components/manualcount/Page4";
import {COLORS} from "../../constants/theme";

export default function ManualCountPusat4() {
    const parties = [PKB, GERINDRA, PDIP, GOLKAR, NASDEM, PARTAI_BURUH, GELORA, PKS, PKN, HANURA, PARTAI_GARUDA, PAN, PBB, DEMOKRAT, PSI, PERINDO, PPP, PARTAI_UMMAT];

    return (
        <ManualCount4 parties={parties} tingkat="pusat" bgcolor={COLORS.yellowPusat} title="Input DPR RI"/>
    );
}