import services from '../config/services';

let Efsetting = {
    dict: {
        resources: services.dict,
        method: 'omd.dict.getbymultidictgroupcode',
        response: 'dict'
    }
};

export default Efsetting;
