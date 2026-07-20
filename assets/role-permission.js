// 视联网消防告警运营平台 - Role Permission Module
(function(){
'use strict';
var ROLES={
  admin:{name:'系统管理员',code:'admin',page:'dashboard.html'},
  reviewer:{name:'运维审核人员',code:'reviewer',page:'ops-review.html'},
  province_chief:{name:'省级消防责任人',code:'province_chief',page:'dashboard.html'},
  city_chief:{name:'市级消防责任人',code:'city_chief',page:'dashboard.html'},
  district_chief:{name:'区级消防责任人',code:'district_chief',page:'dashboard.html'},
  factory:{name:'工厂人员',code:'factory',page:'alarm-management.html'}
};
var FACTORIES=[
  {id:'all',name:'全部工厂'},{id:'f1',name:'杭州萧山消防器材厂'},{id:'f2',name:'宁波北仑化工厂'},
  {id:'f3',name:'温州龙湾电子厂'},{id:'f4',name:'嘉兴南湖纺织厂'},{id:'f5',name:'绍兴越城建材厂'},
  {id:'f6',name:'金华婺城家具厂'}
];
var curRole=localStorage.getItem('fp_role')||'admin';
var curFactory=localStorage.getItem('fp_factory')||'all';
var curUser=localStorage.getItem('fp_user')||'系统管理员';
// Inject factory switcher CSS
var css=document.createElement('style');
css.textContent='.factory-switcher{display:flex;align-items:center;gap:6px;cursor:pointer;padding:5px 12px;border-radius:var(--radius-md);border:1px solid var(--color-border);background:var(--color-surface);transition:all .2s;position:relative;font-size:var(--text-sm);color:var(--color-text-primary)}.factory-switcher:hover{border-color:var(--color-primary);background:var(--color-primary-bg)}.factory-dropdown{position:absolute;top:100%;left:0;margin-top:4px;width:240px;background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-md);box-shadow:var(--shadow-lg);z-index:300;display:none;max-height:320px;overflow-y:auto}.factory-option{padding:10px 16px;font-size:var(--text-sm);cursor:pointer;transition:background .15s;color:var(--color-text-primary);border-bottom:1px solid var(--color-border-light)}.factory-option:last-child{border-bottom:none}.factory-option:hover{background:var(--color-bg)}.factory-option.active{background:var(--color-primary-bg);color:var(--color-primary);font-weight:var(--font-medium)}';
document.head.appendChild(css);
function init(){
  applyFactorySwitcher();
  var fs=document.getElementById('factorySwitcher');
  if(fs&&['admin','province_chief','city_chief','district_chief'].indexOf(curRole)<0)fs.style.display='none';
}
function applyFactorySwitcher(){
  var dd=document.getElementById('factoryDropdown');
  if(!dd)return;
  var h='';
  FACTORIES.forEach(function(f){h+='<div class="factory-option'+(f.id===curFactory?' active':'')+'" data-factory="'+f.id+'" onclick="RolePermission.switchFactory(\''+f.id+'\')">'+f.name+'</div>';});
  dd.innerHTML=h;
}
function navTo(url){window.location.href=url}
window.navTo=navTo;
window.RolePermission={
  ROLES:ROLES,FACTORIES:FACTORIES,
  getRole:function(){return curRole},getFactory:function(){return curFactory},getUser:function(){return curUser},
  setRole:function(r,u){curRole=r;curUser=u||ROLES[r].name;localStorage.setItem('fp_role',r);localStorage.setItem('fp_user',curUser);navTo(ROLES[r].page);},
  switchFactory:function(fid){curFactory=fid;localStorage.setItem('fp_factory',fid);var f=FACTORIES.find(function(a){return a.id===fid});var el=document.getElementById('factoryNameDisplay');if(el)el.textContent=f?f.name:'';var dd=document.getElementById('factoryDropdown');if(dd)dd.style.display='none';document.querySelectorAll('.factory-option').forEach(function(o){o.classList.toggle('active',o.getAttribute('data-factory')===fid)});document.dispatchEvent(new CustomEvent('factoryChanged',{detail:{factoryId:fid,factoryName:f?f.name:''}}));},
  toggleFactoryDD:function(){var dd=document.getElementById('factoryDropdown');if(dd)dd.style.display=dd.style.display==='block'?'none':'block';},
  logout:function(){localStorage.removeItem('fp_role');localStorage.removeItem('fp_user');localStorage.removeItem('fp_factory');navTo('login.html');},
  init:init
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
