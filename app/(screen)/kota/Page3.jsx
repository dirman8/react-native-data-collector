import { PKB, GERINDRA, PDIP, GOLKAR, NASDEM, PARTAI_BURUH, GELORA, PKS, PKN, HANURA, PARTAI_GARUDA, PAN, PBB, DEMOKRAT, PSI, PERINDO, PPP, PARTAI_UMMAT } from '../../constants/calegDapil1';
import ManualCount3 from "../../components/manualcount/Page3";
import {COLORS} from "../../constants/theme";

export default function ManualCountKota2() {
    const parties = [PKB, GERINDRA, PDIP, GOLKAR, NASDEM, PARTAI_BURUH, GELORA, PKS, PKN, HANURA, PARTAI_GARUDA, PAN, PBB, DEMOKRAT, PSI, PERINDO, PPP, PARTAI_UMMAT];

    return (
        <ManualCount3 parties={parties} tingkat="kota" bgcolor={COLORS.greenKota} title="Input DPRD Kota Surabaya"/>
    );
}