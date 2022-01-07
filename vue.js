const app = Vue.createApp({
    data(){
        return {
            pages: 'painel',
            name: 'Brancos',
            total: 105000000,
            group: {
                total: 10,
                slots: 5,
                players: [
                    {id: 3, name: 'Cuscuz Cria', status: true, role: 'Dono'},
                    {id: 3, name: 'Cuscuz Cria', status: true, role: 'Dono'},
                    {id: 103, name: 'Manu Denver', status: false, role: 'Membro'}
                ]
            },
            bank: [
                {id: 103, name: 'Manu Denver', status: 'saque', value: 100000 },
                {id: 103, name: 'Manu Denver', status: 'saque', value: 1000000 },
                {id: 103, name: 'Manu Denver', status: 'deposito', value: 2000000 },
                {id: 3, name: 'Cuscuz Cria', status: 'deposito', value: 1000000 },
                {id: 3, name: 'Cuscuz Cria', status: 'deposito', value: 1000000 },
            ]
        }
    },
    computed: {
        getOnline(){
               return this.group.players.filter(el => el.status)
        },
        getTotal(){
            let arr = {
                value: 0
            }
            if (this.bank.length > 0){
                return this.bank.reduce((a,b) => ({value: a.value + b.value}))
            }else{
                return arr
            }
        },
        getTopDeposit(){
            let arr = []
            this.bank.forEach((element, index) => {
                let repeated = undefined
                element.value = element.status == 'saque' ? element.value * -1 : element.value
                arr.forEach((el,i) =>{
                    if (el.id == element.id){
                        repeated = i
                    }
                })
                if (repeated === undefined){
                    arr.push({id: element.id, name: element.name, status: element.status, value: element.value})
                }else{
                    arr[repeated].value = element.value + arr[repeated].value
                }

            })
            return arr.sort(function (a, b) {
                if (a.value < b.value) {
                  return 1;
                }
                if (a.value > b.value) {
                  return -1;
                }
                // a must be equal to b
                return 0;
              });
        }
    }

})
app.mount("#app");

tailwind.config = {
    theme: {
      extend: {
        screens:{
            'media': '801px'
        },
        fontFamily:{
            'display': ['Montserrat , -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'],
            'yanone': ['Yanone Kaffeesatz, ui-sans-serif']
        }
      }
    },
    variants: {
        backgroundColor: ['active']
    }
}