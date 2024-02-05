// import { PKB, GERINDRA, PDIP, GOLKAR, NASDEM, PARTAI_BURUH, GELORA, PKS, PKN, HANURA, PARTAI_GARUDA, PAN, PBB, DEMOKRAT, PSI, PERINDO, PPP, PARTAI_UMMAT } from '../../constants/calegDapil1';
import * as dapil1 from '../../constants/calegDapil1';
import * as dapil2 from '../../constants/calegDapil2';
import * as dapil3 from '../../constants/calegDapil3';
import * as dapil4 from '../../constants/calegDapil4';
import * as dapil5 from '../../constants/calegDapil5';
import ManualCount3 from "../../components/manualcount/Page3";
import {COLORS} from "../../constants/theme";
import { dapilStorage } from '../../utils/storage';

export default function ManualCountKota2() {
    const serializedDapil = dapilStorage.getString('dapil');
    const getDapil = JSON.parse(serializedDapil);
    console.log("getDapil :", getDapil);

    const dapilPartyMap = {
        dapil1:[ dapil1.PKB, dapil1.GERINDRA, dapil1.PDIP, dapil1.GOLKAR, dapil1.NASDEM, dapil1.PARTAI_BURUH, dapil1.GELORA, dapil1.PKS, dapil1.PKN, dapil1.HANURA, dapil1.PARTAI_GARUDA, dapil1.PAN, dapil1.PBB, dapil1.DEMOKRAT, dapil1.PSI, dapil1.PERINDO, dapil1.PPP, dapil1.PARTAI_UMMAT ], 
        dapil2: [ dapil2.PKB, dapil2.GERINDRA, dapil2.PDIP, dapil2.GOLKAR, dapil2.NASDEM, dapil2.PARTAI_BURUH, dapil2.GELORA, dapil2.PKS, dapil2.PKN, dapil2.HANURA, dapil2.PARTAI_GARUDA, dapil2.PAN, dapil2.PBB, dapil2.DEMOKRAT, dapil2.PSI, dapil2.PERINDO, dapil2.PPP, dapil2.PARTAI_UMMAT ],
        dapil3: [ dapil3.PKB, dapil3.GERINDRA, dapil3.PDIP, dapil3.GOLKAR, dapil3.NASDEM, dapil3.PARTAI_BURUH, dapil3.GELORA, dapil3.PKS, dapil3.PKN, dapil3.HANURA, dapil3.PARTAI_GARUDA, dapil3.PAN, dapil3.PBB, dapil3.DEMOKRAT, dapil3.PSI, dapil3.PERINDO, dapil3.PPP, dapil3.PARTAI_UMMAT ],
        dapil4: [ dapil4.PKB, dapil4.GERINDRA, dapil4.PDIP, dapil4.GOLKAR, dapil4.NASDEM, dapil4.PARTAI_BURUH, dapil4.GELORA, dapil4.PKS, dapil4.PKN, dapil4.HANURA, dapil4.PARTAI_GARUDA, dapil4.PAN, dapil4.PBB, dapil4.DEMOKRAT, dapil4.PSI, dapil4.PERINDO, dapil4.PPP, dapil4.PARTAI_UMMAT ],
        dapil5:[ dapil5.PKB, dapil5.GERINDRA, dapil5.PDIP, dapil5.GOLKAR, dapil5.NASDEM, dapil5.PARTAI_BURUH, dapil5.GELORA, dapil5.PKS, dapil5.PKN, dapil5.HANURA, dapil5.PARTAI_GARUDA, dapil5.PAN, dapil5.PBB, dapil5.DEMOKRAT, dapil5.PSI, dapil5.PERINDO, dapil5.PPP, dapil5.PARTAI_UMMAT ]
    }
    console.log("state.dapil : ", getDapil.dapil)
    const parties = dapilPartyMap[`dapil${getDapil.dapil}`] || [];

    return (
        <ManualCount3 parties={parties} tingkat="kota" bgcolor={COLORS.greenKota} title="Input DPRD Kota Surabaya"/>
    );
}