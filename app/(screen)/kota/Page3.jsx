// import { PKB, GERINDRA, PDIP, GOLKAR, NASDEM, PARTAI_BURUH, GELORA, PKS, PKN, HANURA, PARTAI_GARUDA, PAN, PBB, DEMOKRAT, PSI, PERINDO, PPP, PARTAI_UMMAT } from '../../constants/calegDapil1';
import ManualCount3 from "../../components/manualcount/Page3";
import {COLORS} from "../../constants/theme";
import { dapilStorage } from '../../utils/storage';
import { kotaStorage } from '../../utils/storage';
import { dapilPartyMap } from '../../utils/pilihDapil';

export default function ManualCountKota2() {
    const serializedDapil = dapilStorage.getString('dapil');
    const getDapil = JSON.parse(serializedDapil);

    const parties = dapilPartyMap[`dapil${getDapil.dapil}`] || [];

    return (
        <ManualCount3 parties={parties} tingkat="kota" storage={kotaStorage} bgcolor={COLORS.greenKota} title="Input DPRD Kota Surabaya"/>
    );
}