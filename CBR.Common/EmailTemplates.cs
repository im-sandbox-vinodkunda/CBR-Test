using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

namespace CBR.Common
{
    public static class EmailTemplates
    {
        #region Administrator Invitation Email Template
        public const string adminInvitationTemplate = @"<table width='100%' cellpadding='0' cellspacing='0' border='0' bgcolor='#fffffff'>
	<tr>
		<td bgcolor='#ffffff' width='100%'>
			<table width='600' cellpadding='0' cellspacing='0' border='0' align='center' class='table'>
				<tr>
					<td width='600' class='cell'>
					<table width='600' cellpadding='0' cellspacing='0' border='0' class='table'>
						<tr>
							<td align='right' width='350' class='hide' style='color:#a6a6a6;font-size:12px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;text-shadow: 0 1px 0 #ffffff;' valign='top' bgcolor='#ffffff'><img border='0' src='https://cb-resource-prod.azurewebsites.net/Images/spacer.gif' width='1' height='20'><br><span>Administrator Registration to Stifel Bank Analytics</span></td>
						</tr>
					</table>
					<img border='0' src='https://cb-resource-prod.azurewebsites.net/Images/spacer.gif' width='1' height='15' class='divider'><br>
					<repeater>
						<layout label='New feature'>
						<table width='100%' cellpadding='0' cellspacing='0' border='0'>
						<tr>
							<td bgcolor='#ffffff' nowrap><img border='0' src='https://cb-resource-prod.azurewebsites.net/Imagesspacer.gif' width='5' height='1'></td>
							<td width='100%' bgcolor='#ffffff'>
						
								<table width='100%' cellpadding='20' cellspacing='0' border='0'>
									<tr>
										<td bgcolor='#ffffff' class='contentblock'>

											<multiline label='Description'>
												<p style='color:#888888;font-size:14px;line-height:1.25em;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin-top:0;margin-bottom:10px;padding-top:0;padding-bottom:0;font-weight:normal;'>Hello {0},</p>

												<p style='color:#888888;font-size:14px;line-height:1.25em;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin-top:0;margin-bottom:10px;padding-top:0;padding-bottom:0;font-weight:normal;'>Welcome to Stifel Bank Analytics. You have been designated as the Administrator for this account.</p>

												<p style='color:#888888;font-size:14px;line-height:1.25em;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin-top:0;margin-bottom:10px;padding-top:0;padding-bottom:0;font-weight:normal;'>Please click <a href='{1}' style='color:#3ca7dd;text-decoration:none;'>HERE</a> to register and get access to your Bank Analytics account.</p>

												<p style='color:#888888;font-size:14px;line-height:1.25em;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin-top:0;margin-bottom:10px;padding-top:0;padding-bottom:0;font-weight:normal;'>Should you have any questions, please contact Stifel support <a href='mailto:castellonf@stifel.com' style='color:#3ca7dd;text-decoration:none;'>HERE</a></p>

												<p>
												&nbsp;
												</p>
												<p style='color:#888888;font-size:14px;line-height:1.25em;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin-top:0;margin-bottom:10px;padding-top:0;padding-bottom:0;font-weight:normal;'>
												Thank you!<br/></p>
												<img border='0' style='margin-left:-8px' width=250 height=40 src='{3}Images/Stifel_Bank_Analytics-color.png' label='Stifel' editable='true' id='screenshot'>
											</multiline>
										</td>
									</tr>
								</table>
							</td>
						</tr>
						</table>  
						<img border='0' src='https://cb-resource-prod.azurewebsites.net/Images/spacer.gif' width='1' height='15' class='divider'><br>
						</layout>	
					</repeater>           
					</td>
				</tr>
			</table>
			<img border='0' src='https://cb-resource-prod.azurewebsites.net/Images/spacer.gif' width='1' height='25' class='divider'><br>
		</td>
	</tr>
</table>";
        #endregion

        #region User Invitation Email Template
        public const string userInvitationEmailTemplate = @"<table width='100%' cellpadding='0' cellspacing='0' border='0' bgcolor='#fffffff'>
<tr>
	<td bgcolor='#ffffff' width='100%'>

	<table width='600' cellpadding='0' cellspacing='0' border='0' align='left' class='table'>
	<tr>
		<td width='600' class='cell'>
		<repeater>
			<layout label='New feature'>
			<table width='100%' cellpadding='0' cellspacing='0' border='0'>
			<tr>
				<td bgcolor='#ffffff' nowrap><img border='0' src='https://cb-resource-prod.azurewebsites.net/Images/spacer.gif' width='5' height='1'></td>
				<td width='100%' bgcolor='#ffffff'>
			
					<table width='100%' cellpadding='20' cellspacing='0' border='0'>
					<tr>
						<td bgcolor='#ffffff' class='contentblock'>

							<multiline label='Description'>
								<p style='color:#888888;font-size:14px;line-height:1.25em;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin-top:0;margin-bottom:10px;padding-top:0;padding-bottom:0;font-weight:normal;'>Hello {0},</p>

									<p style='color:#888888;font-size:14px;line-height:1.25em;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin-top:0;margin-bottom:10px;padding-top:0;padding-bottom:0;font-weight:normal;'>Welcome to Stifel Bank Analytics. You have been invited to register for this account.</p>
									<p style='color:#888888;font-size:14px;line-height:1.25em;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin-top:0;margin-bottom:10px;padding-top:0;padding-bottom:0;font-weight:normal;'>Please click <a href='{1}' style='color:#3ca7dd;text-decoration:none;'>HERE</a> to register and get access to your Bank Analytics account.</p> 
									<p style='color:#888888;font-size:14px;line-height:1.25em;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin-top:0;margin-bottom:10px;padding-top:0;padding-bottom:0;font-weight:normal;'>Should you have any questions, please contact Stifel support <a href='mailto:castellonf@stifel.com' style='color:#3ca7dd;text-decoration:none;'>HERE</a></p>
								<p>

								</p>
								<p style='color:#888888;font-size:14px;line-height:1.25em;font-family:' Helvetica Neue',Helvetica,Arial,sans-serif;margin-top:0;margin-bottom:10px;padding-top:0;padding-bottom:0;font-weight:normal;'>
									Thank you!<br />
									<img border='0' style='margin-left:-8px' width=250 height=40 src='{3}Images/Stifel_Bank_Analytics-color.png' label='Stifel' editable='true' id='screenshot'>

								</p>
							</multiline>
						</td>
					</tr>
					</table>
				</td>
			</tr>
			</table>  
			<img border='0' src='https://cb-resource-prod.azurewebsites.net/Images/spacer.gif' width='1' height='15' class='divider'><br>
			</layout>	
		</repeater>           
		</td>
	</tr>
	</table>
	<img border='0' src='https://cb-resource-prod.azurewebsites.net/Images/spacer.gif' width='1' height='25' class='divider'<br>
	</td>
</tr>
</table>";
        #endregion

        #region E-Mail Confirmation Tmail Template
        public const string accountConfirmationEmailTemplate = @"<table width='100%' cellpadding='0' cellspacing='0' border='0' bgcolor='#fffffff'>
<tr>
	<td bgcolor='#ffffff' width='100%'>
	<table width='600' cellpadding='0' cellspacing='0' border='0' align='center' class='table'>
	<tr>
		<td width='600' class='cell'>
	   	<table width='600' cellpadding='0' cellspacing='0' border='0' class='table'>
		<tr>
			<td align='right' width='350' class='hide' style='color:#a6a6a6;font-size:12px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;text-shadow: 0 1px 0 #ffffff;' valign='top' bgcolor='#ffffff'><img border='0' src='https://cb-resource-prod.azurewebsites.net/Images/spacer.gif' width='1' height='20'><br><span>E-Mail Address and Registration Confirmation</span></td>
		</tr>
		</table>
		<img border='0' src='https://cb-resource-prod.azurewebsites.net/Images/spacer.gif' width='1' height='15' class='divider'><br>
		<repeater>
			<layout label='New feature'>
			<table width='100%' cellpadding='0' cellspacing='0' border='0'>
			<tr>
				<td bgcolor='#ffffff' nowrap><img border='0' src='https://cb-resource-prod.azurewebsites.net/Images/spacer.gif' width='5' height='1'></td>
				<td width='100%' bgcolor='#ffffff'>
			
					<table width='100%' cellpadding='20' cellspacing='0' border='0'>
					<tr>
						<td bgcolor='#ffffff' class='contentblock'>

							<multiline label='Description'>
								<p style='color:#888888;font-size:14px;line-height:1.25em;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin-top:0;margin-bottom:10px;padding-top:0;padding-bottom:0;font-weight:normal;'>Hi {0},</p>
									<p style='color:#888888;font-size:14px;line-height:1.25em;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin-top:0;margin-bottom:10px;padding-top:0;padding-bottom:0;font-weight:normal;'>You have successfully registered with CB Resource web portal.</p>
									<p style='color:#888888;font-size:14px;line-height:1.25em;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin-top:0;margin-bottom:10px;padding-top:0;padding-bottom:0;font-weight:normal;'>Please <a href='{1}' style='color:#3ca7dd;text-decoration:none;'>click HERE</a> to confirm your email address and access our site.</p>
								<p>
								&nbsp;
								</p>
								<p style='color:#888888;font-size:14px;line-height:1.25em;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin-top:0;margin-bottom:10px;padding-top:0;padding-bottom:0;font-weight:normal;'>
								Thank you!<br/>
								<strong>The CB Resource team</strong><br />
								</p>
								<p style='color:#888888;font-size:14px;line-height:1.25em;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin-top:0;margin-bottom:10px;padding-top:0;padding-bottom:0;font-weight:normal;'>
									<img border='0' src='https://cb-resource-prod.azurewebsites.net/Images/cb-resource-inc.png' label='Cb Resource Logo' editable='true' width='70' height='50' id='screenshot'>
								</p>
							</multiline>
						</td>
					</tr>
					</table>
				</td>
			</tr>
			</table>  
			<img border='0' src='https://cb-resource-prod.azurewebsites.net/Images/spacer.gif' width='1' height='15' class='divider'><br>
			</layout>	
		</repeater>           
		</td>
	</tr>
	</table>	
		<img border='0' src='https://cb-resource-prod.azurewebsites.net/Images/spacer.gif' width='1' height='25' class='divider'><br>
	</td>
</tr>
</table>";
        #endregion

        #region CD Order Email Template
        public const string CDOrderEmailTemplate = @"<p>A CD Order has been submitted by {0} on {1}.</p>
<p>Order details:</p>
<table style='width: 100%; border-collapse: collapse;' border='1'>
<tbody>
<tr>
<td style='width: 11.11%; text-align: center;'><strong><span style='font-size: 8pt;'>Order #</span></strong></td>
<td style='width: 11.11%; text-align: center;'><strong><span style='font-size: 8pt;'>Term</span></strong></td>
<td style='width: 11.11%; text-align: center;'><strong><span style='font-size: 8pt;'>Callable</span></strong></td>
<td style='width: 11.11%; text-align: center;'><strong><span style='font-size: 8pt;'>Call Frequency</span></strong></td>
<td style='width: 11.11%; text-align: center;'><strong><span style='font-size: 8pt;'>Rate</span></strong></td>
<td style='width: 11.11%; text-align: center;'><strong><span style='font-size: 8pt;'>Amount</span></strong></td>
<td style='width: 11.11%; text-align: center;'><strong><span style='font-size: 8pt;'>Settle Date</span></strong></td>
<td style='width: 11.11%; text-align: center;'><strong><span style='font-size: 8pt;'>Frequency</span></strong></td>
<td style='width: 11.11%; text-align: center;'><strong><span style='font-size: 8pt;'>Notes</span></strong></td>
</tr>
{2}
</tbody>
</table>";

        public const string CDOrderDetailLine = @"<td style='width: 11.11%; text-align: center;'><span style='font-size: 8pt;'>{0}</span></td>";
        public const string CDOrderDetailNotesLine = @"<td style='width: 11.11%; text-align: center;word-break:break-all;'><span style='font-size: 8pt;'>{0}</span></td>";
        public const string HtmlRow = @"<tr>{0}</tr>";
        #endregion

        #region Password Reset Email Template
        public const string passwordResetEmailTemplate = @"<table width='100%' cellpadding='0' cellspacing='0' border='0' bgcolor='#fffffff'>
<tr>
	<td bgcolor='#ffffff' width='100%'>

	<table width='600' cellpadding='0' cellspacing='0' border='0' align='center' class='table'>
	<tr>
		<td width='600' class='cell'>
		
	   	<table width='600' cellpadding='0' cellspacing='0' border='0' class='table'>
		<tr>
			<td align='right' width='350' class='hide' style='color:#a6a6a6;font-size:12px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;text-shadow: 0 1px 0 #ffffff;' valign='top' bgcolor='#ffffff'><img border='0' src='https://cb-resource-prod.azurewebsites.net/Images/spacer.gif' width='1' height='20'><br><span>User Registration to Stifel Bank Analytics</span></td>
		</tr>
		</table>
	
		<img border='0' src='https://cb-resource-prod.azurewebsites.net/Images/spacer.gif' width='1' height='15' class='divider'><br>
	
		<repeater>
			<layout label='New feature'>
			<table width='100%' cellpadding='0' cellspacing='0' border='0'>
			<tr>
				<td bgcolor='#ffffff' nowrap><img border='0' src='https://cb-resource-prod.azurewebsites.net/Images/spacer.gif' width='5' height='1'></td>
				<td width='100%' bgcolor='#ffffff'>
			
					<table width='100%' cellpadding='20' cellspacing='0' border='0'>
					<tr>
						<td bgcolor='#ffffff' class='contentblock'>

							<multiline label='Description'>
								<p style='color:#888888;font-size:14px;line-height:1.25em;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin-top:0;margin-bottom:10px;padding-top:0;padding-bottom:0;font-weight:normal;'>Hello {0},</p>

									<p style='color:#888888;font-size:14px;line-height:1.25em;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin-top:0;margin-bottom:10px;padding-top:0;padding-bottom:0;font-weight:normal;'>Welcome back to the Stifel Bank Analytics.</p>
									<p style='color:#888888;font-size:14px;line-height:1.25em;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin-top:0;margin-bottom:10px;padding-top:0;padding-bottom:0;font-weight:normal;'>Click <a href='https://cb-resource-prod.azurewebsites.net/' style='color:#3ca7dd;text-decoration:none;'>HERE</a> to enter Stifel Bank Analytics or click <a href='{1}' style='color:#3ca7dd;text-decoration:none;'>HERE</a> to reset your password.</p> 
									<p style='color:#888888;font-size:14px;line-height:1.25em;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin-top:0;margin-bottom:10px;padding-top:0;padding-bottom:0;font-weight:normal;'>You user name registered with us is: {2}</p>
									<p style='color:#888888;font-size:14px;line-height:1.25em;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin-top:0;margin-bottom:10px;padding-top:0;padding-bottom:0;font-weight:normal;'>Should you have any questions, please contact Stifel support <a href='mailto:castellonf@stifel.com' style='color:#3ca7dd;text-decoration:none;'>HERE</a></p>

								<p>
								&nbsp;
								</p>
								<p style='color:#888888;font-size:14px;line-height:1.25em;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin-top:0;margin-bottom:10px;padding-top:0;padding-bottom:0;font-weight:normal;'>
								Thank you!<br/>
								<strong>The CB Resource team</strong><br />
								</p>
								<p style='color:#888888;font-size:14px;line-height:1.25em;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin-top:0;margin-bottom:10px;padding-top:0;padding-bottom:0;font-weight:normal;'>
									<img border='0' src='https://cb-resource-prod.azurewebsites.net/Images/cb-resource-inc.png' label='Cb Resource Logo' editable='true' width='70' height='50' id='screenshot'>
								</p>
							</multiline>
						</td>
					</tr>
					</table>
				</td>
			</tr>
			</table>  
			<img border='0' src='https://cb-resource-prod.azurewebsites.net/Images/spacer.gif' width='1' height='15' class='divider'><br>
			</layout>	
		</repeater>           
		</td>
	</tr>
	</table>
	<img border='0' src='https://cb-resource-prod.azurewebsites.net/Images/spacer.gif' width='1' height='25' class='divider'><br>
	</td>
</tr>
</table>";
        #endregion
    }
}
