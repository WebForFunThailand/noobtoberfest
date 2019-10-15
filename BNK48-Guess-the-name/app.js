function shuffle(a) {
   for (let i = a.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [a[i], a[j]] = [a[j], a[i]];
   }

   return a
}

var current_member = 0
var member
var score = 0

function controller(cm) {
   var url = 'https://www.bnk48.com/data/Members/'+member[cm].mem_id+'/s/'+member[cm].mem_images
   
   $('img#img_member').attr('src', url)
   $('img#img_member').attr('alt', member[0].mem_nickname)
}

function handleSubmit() {
   $('#submit').click(function() {
      var aws = $('#input_aws').val().toUpperCase()

      if(aws != '') {
         if(aws == member[current_member].mem_nickname) {
            score += 1
         }

         current_member += 1
         $('#score').html(score)
         $('#input_aws').focus()
         $('#input_aws').val('')
         $('#count_mener').html(current_member + 1 + '/' + member.length)
         
         if (current_member >= member.length) {   
            $('.area').html('<h1 style="color: #fff">Your score: '+ score +'/'+ member.length +'</h1>')
         }
         else {
            controller(current_member)
         }
      }

   })
}

$(document).ready(function() {
   $.ajax({
      url: "member.json",
      dataType: "JSON",
      success: function(res) {
         member = shuffle(res)
         controller(current_member)
      }
   })

   handleSubmit()
})
