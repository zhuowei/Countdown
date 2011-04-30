package  { 
    import flash.display.*; 
    import flash.media.StageWebView; 
    import flash.geom.Rectangle;
    import flash.filesystem.File;
    import flash.events.Event;
    [SWF(width='1024', height='600', backgroundColor='#000000', frameRate='5')]
    public class StageWebViewWrapper extends Sprite{ 
 
        private var webView:StageWebView = new StageWebView(); 
         
        public function StageWebViewWrapper() { 
		this.width=stage.stageWidth;
		this.height=stage.stageHeight;
	    stage.scaleMode=StageScaleMode.NO_SCALE;
		stage.align = StageAlign.TOP_LEFT;
            webView.stage = this.stage; 
            webView.viewPort = new Rectangle( 0, 0, stage.stageWidth, stage.stageHeight ); 
	    var mainfile:File=File.applicationDirectory.resolvePath("main.html");
	    //trace(mainfile.nativePath);
            webView.loadURL("file://" + mainfile.nativePath); 
	    stage.addEventListener("orientationChange", resizeUI);
	    stage.addEventListener("resize", resizeUI);
        } 
	private function resizeUI(e:Event):void{
		this.width=stage.stageWidth;
		this.height=stage.stageHeight;
		webView.viewPort=new Rectangle( 0, 0, stage.stageWidth, stage.stageHeight );
	}
    } 
}
