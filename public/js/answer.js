;(function () {
    'use strict';

    angular.module('answer',[])
    
        .service('AnswerService',[
            '$http',
            function ($http) {
                var me = this;
                me.data = {};
                /*
                * @answers array 用于统计票数的数据
                *此数据可以是问题也可以是回答
                *如果是问题将会跳过统计
                * */
                me.count_vote = function (answers) {

                    for(var i = 0;i<answers.length;i++){
                        var votes, item = answers[i];

                        if(!item['question_id'])
                            continue;
                        me.data[item.id] = item;
                        if(!item['users'])
                            continue;
                        item.upvote_count = 0;
                        item.downvote_count = 0;

                        /*users是所有投票用户的用户信息*/
                        votes = item['users'];
                        if(votes){
                            for(var j=0;j<votes.length;j++){
                                var v = votes[j];
                                /*
                                **获取pivot元素中的用户投票信息，如果是1增加1赞同票
                                **如果是2增加1反对票
                                */
                                if(v['pivot'].vote === 1){
                                    item.upvote_count++;
                                }
                                if(v['pivot'].vote === 2){
                                    item.downvote_count++;
                                }
                            }
                        }
                    }
                    return answers;
                }
                
                me.vote = function (conf) {
                    if(!conf.id || !conf.vote){
                        console.log('id and vote are required');
                        return;
                    }

                    var answer = me.data[conf.id];
                    var users = answer.users;
                    for(var i =0;i<users.length;i++){
                        if(users[i].id == his.id && conf.vote == users[i].pivot.vote){
                            conf.vote = 3;
                        }
                    }

                    return $http.post('/api/answer/vote',conf)
                        .then(function (r) {
                            console.log('eee');
                            if(r.data.status){
                                console.log(r.data.status);
                                return true;
                            }
                            console.log(r.data.status);
                            return false;
                        }, function (e) {
                            console.log('e',e);
                            return false;
                        })
                }
                
                me.update_data = function (id) {
                    return $http.post('/api/answer/read',{id:id})
                        .then(function (r) {
                            me.data[id] = r.data.data;
                        })
                    //if(angular.isNumeric(input)) {
                    //    var id = input;
                    //}
                    //if(angular.isArray(input)){
                    //    var id_set = input;
                    //}
                }
            }
        ])
})();