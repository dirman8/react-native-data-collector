import { PKB, GERINDRA, PDIP, GOLKAR, NASDEM, PARTAI_BURUH, GELORA, PKS, PKN, HANURA, PARTAI_GARUDA, PAN, PBB, DEMOKRAT, PSI, PERINDO, PPP, PARTAI_UMMAT } from '../../constants/calegPusat';
import ManualCount3 from "../../components/manualcount/Page3";
import {COLORS} from "../../constants/theme";
import { pusatStorage } from '../../utils/storage';

export default function ManualCountPusat3() {
    const parties = [PKB, GERINDRA, PDIP, GOLKAR, NASDEM, PARTAI_BURUH, GELORA, PKS, PKN, HANURA, PARTAI_GARUDA, PAN, PBB, DEMOKRAT, PSI, PERINDO, PPP, PARTAI_UMMAT];

    return (
        <ManualCount3 parties={parties} tingkat="pusat" storage={pusatStorage} bgcolor={COLORS.yellowPusat} title="Input DPR RI"/>
    );
}