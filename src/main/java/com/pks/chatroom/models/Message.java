package com.pks.chatroom.models;

public class Message {

	
	private String name;
	private String content;
	private boolean isSystemMsg;
	
	
	public Message(String name, String content, boolean isSystemMsg) {
		super();
		this.name = name;
		this.content = content;
		this.isSystemMsg = isSystemMsg;
	}
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public boolean isSystemMsg() {
		return isSystemMsg;
	}
	public void setisSystemMsg(boolean isSystemMsg) {
		this.isSystemMsg = isSystemMsg;
	}
	
}
