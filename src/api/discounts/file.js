import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
    // return 'a083e8435af9b4c7f3ebc5cbe2a0e16ec0e0763b';
}
const Api = {
    getFileList(data){
        return _mm.POST({
            url:'/admin/Merchandise/queryCheckLists',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    getFileDetail(data){
        return _mm.POST({
            url:'/admin/Merchandise/selectMerchandise',
            data:{
                ...data,
                token:getToken()
            }
        })
    },
    //添加商品文件
    addFile(data){
        return _mm.POST({
            url:'/admin/Merchandise/addMerchandise',
            data:{
                ...data,
                token:getToken()
            }
        })
    }
}
export default Api;