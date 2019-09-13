import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute} from '@angular/router'


@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.page.html',
  styleUrls: ['./private-chat.page.scss'],
})
export class PrivateChatPage implements OnInit {

  @Input() name
  @Input() temp




  constructor(private addr: ActivatedRoute) { }

  ngOnInit() {

    this.addr.queryParams.subscribe(data => {
      console.log(data)

      this.name = data.name;
      console.log(this.name)
      this.temp = data.temp;
      console.log(this.temp)

  });

}
}